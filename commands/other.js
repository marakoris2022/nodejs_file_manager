export function info() {
  console.log('"up" - Go one directory level up from the current directory.');
  console.log(
    '"cd path_to_directory" - Change to the specified directory. Path can be relative or absolute.'
  );
  console.log(
    '"ls" - List all files and folders in the current directory. Folders come first, followed by files, sorted alphabetically.'
  );
  console.log(
    '"cat path_to_file" - Read the content of a file and print it to the console.'
  );
  console.log(
    '"add new_file_name" - Create an empty file in the current working directory.'
  );
  console.log(
    '"rn path_to_file new_filename" - Rename a file, keeping its content unchanged.'
  );
  console.log(
    '"cp path_to_file path_to_new_directory" - Copy a file to a new directory using streams.'
  );
  console.log(
    '"mv path_to_file path_to_new_directory" - Move a file to a new directory. This involves copying and then deleting the original file.'
  );
  console.log('"rm path_to_file" - Delete a file.');
  console.log('"os --EOL" - Get the default system End-Of-Line character.');
  console.log(
    '"os --cpus" - Get information about the host machine\'s CPUs, including model and clock rate.'
  );
  console.log('"os --homedir" - Get the home directory of the current user.');
  console.log('"os --username" - Get the current system user’s name.');
  console.log(
    '"os --architecture" - Get the CPU architecture for which Node.js was compiled.'
  );
  console.log(
    '"hash path_to_file" - Calculate and print the hash of a specified file.'
  );
  console.log(
    '"compress path_to_file path_to_destination" - Compress a file using the Brotli algorithm.'
  );
  console.log(
    '"decompress path_to_file path_to_destination" - Decompress a Brotli-compressed file.'
  );
}
