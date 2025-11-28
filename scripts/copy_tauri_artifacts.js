import { readdirSync, existsSync, mkdirSync, copyFileSync, statSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
const targetDir = join(projectRoot, 'src-tauri', 'target');
const destDir = join(projectRoot, 'build', 'tauri');

// Only copy final distributable packages (installers)
const distributableExtensions = ['.dmg', '.exe', '.msi', '.AppImage', '.deb', '.rpm', '.tar.gz', '.zip'];

// Ensure destination directory exists
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

function getAllFiles(dir, fileList = []) {
  if (!existsSync(dir)) {
    return fileList;
  }

  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

function copyArtifactsFromPath(targetTriple, buildType) {
  const bundleDir = join(targetDir, targetTriple, buildType, 'bundle');
  
  if (!existsSync(bundleDir)) {
    console.log(`Bundle directory not found: ${bundleDir}`);
    return 0;
  }

  // Get all files recursively from bundle directory
  const allFiles = getAllFiles(bundleDir);
  let copied = 0;
  
  for (const filePath of allFiles) {
    // Get filename and extension
    const fileName = basename(filePath);
    const ext = extname(fileName);
    
    // Only copy distributable packages (skip intermediate build files)
    // Check for .tar.gz separately as it has a double extension
    const isDistributable = distributableExtensions.some(extPattern => {
      if (extPattern === '.tar.gz') {
        return fileName.endsWith('.tar.gz');
      }
      return ext === extPattern;
    });
    
    if (!isDistributable) continue;
    
    const nameWithoutExt = fileName.slice(0, -ext.length);
    
    // Handle .tar.gz extension properly
    let actualExt = ext;
    let actualNameWithoutExt = nameWithoutExt;
    if (fileName.endsWith('.tar.gz')) {
      actualExt = '.tar.gz';
      actualNameWithoutExt = fileName.slice(0, -7); // Remove .tar.gz
    }
    
    // Determine destination filename
    let destFileName;
    if (buildType === 'debug') {
      // Add _debug before extension
      destFileName = `${actualNameWithoutExt}_debug${actualExt}`;
    } else {
      // Keep as is for release
      destFileName = fileName;
    }
    
    const destPath = join(destDir, destFileName);
    
    // Copy file
    copyFileSync(filePath, destPath);
    console.log(`✓ Copied ${fileName} → build/tauri/${destFileName}`);
    copied++;
  }
  
  return copied;
}

function findAndCopyArtifacts() {
  if (!existsSync(targetDir)) {
    console.log('Target directory not found. Build may not have completed.');
    return;
  }

  // Check if target triple and build type are provided as command-line arguments
  const args = process.argv.slice(2);
  if (args.length >= 2) {
    const targetTriple = args[0];
    const buildType = args[1];
    
    console.log(`Copying artifacts for ${targetTriple} (${buildType})...`);
    const copied = copyArtifactsFromPath(targetTriple, buildType);
    
    if (copied === 0) {
      console.log('No bundle files found.');
    } else {
      console.log(`\n✨ ${copied} file(s) copied to build/tauri/`);
    }
    return;
  }

  // Fallback to searching all targets (backward compatibility)
  const targetTriples = readdirSync(targetDir).filter(item => {
    const itemPath = join(targetDir, item);
    return statSync(itemPath).isDirectory() && item !== 'debug' && item !== 'release';
  });

  if (targetTriples.length === 0) {
    console.log('No target architectures found.');
    return;
  }

  let totalCopied = 0;

  // Process both debug and release builds
  for (const buildType of ['debug', 'release']) {
    for (const triple of targetTriples) {
      totalCopied += copyArtifactsFromPath(triple, buildType);
    }
  }

  if (totalCopied === 0) {
    console.log('No bundle files found in target directory.');
  } else {
    console.log(`\n✨ ${totalCopied} file(s) copied to build/tauri/`);
  }
}

findAndCopyArtifacts();

