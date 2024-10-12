export function getUserName() {
  try {
    const useDataFromCLI = process.argv.find((item) =>
      item.includes("username")
    );
    return useDataFromCLI.split("=")[1];
  } catch {
    console.error(
      'Cant get the user name, run program with: "npm run start -- --username=your_username"'
    );
    process.exit();
  }
}
