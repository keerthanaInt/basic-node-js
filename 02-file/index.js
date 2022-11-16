// const fs = require("fs");
// {---01----}
// fs.readFile("./fileData/starter.txt", (err, data) => {
//   if (err) throw err;
//   // when i try to write a data i can see butter binary data so i need to convert into string or stranded encoding need to add
//   console.log(data);
//   console.log("read completed");
// });

// {---02----}
// fs.readFile("./fileData/starter.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log("data", data);
//   console.log("read completed");
// });
// {---03---}
// // if there i any error like there is no file or can't able to read secured file

// fs.readFile("./fileData/notFile.txt", "utf8", (error, data) => {
// //   if (error) throw error;
// if (error) throw console.log("there is no file");
// //if i didn't used err then no need for process
//   console.log(data + "\n" + "read completed ");
// });

// // it will throw error but we need add any error message and also to stop process
// console.log("-------------");
// process.on("uncaughtException", (err) => {
//   console.log("there is uncaught exception:", err);
//   process.exit(1);
// });

// {---04--}
//don't use file  path directly to read or write append , replay file function
// in this case we can use path lib

// const path = require("path");

// fs.readFile(
//   path.join(__dirname, "fileData", "starter.txt"),
//   "utf8",
//   (error, data) => {
//     if (error) throw error;
//     console.log(data + "\n" + "read completed");
//   }
// );

//instead of utf8 we can use toString function

// fs.readFile(path.join(__dirname, "fileData", "starter.txt"), (err, data) => {
//   if (err) throw err;
//   console.log(data.toString() + "\n" + "read completed");
// });
// {---05---}
// fs.writeFile(
//   path.join(__dirname, "fileData", "write.txt"),
//   "yes new data",
//   (err) => {
//     if (err) throw err;
//     console.log("write completed");
//   }
// );
// {---06---}
// fs.appendFile(
//   path.join(__dirname, "fileData", "append.txt"),
//   "new data added",
//   (err) => {
//     if (err) throw err;
//     console.log("append Completed");
//   }
// );
//{---07---}
// fs.writeFile(
//   path.join(__dirname, "fileData", "final.txt"),
//   "Thank You",
//   (err) => {
//     if (err) throw err;
//     console.log("write Completed");
//     fs.appendFile(
//       path.join(__dirname, "fileData", "final.txt"),
//       "\n\n keerthana V.",
//       (err) => {
//         if (err) throw err;
//         console.log("append completed");

//         fs.rename(
//           path.join(__dirname, "fileData", "final.txt"),
//           path.join(__dirname, "fileData", "renameFinal.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("rename completed");
//           }
//         );
//       }
//     );
//   }
// );
// {---08---}
// we are using promises to help of async and await because js is a sync so it's completed the operation any time so we need async and await here we have example

const fsPromises = require("fs").promises;
//if we not used promises we can't use async and await
const path = require("path");
const fileOperation = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "fileData", "starter.txt"),
      "utf8"
    );
    console.log("data==>", data);
    await fsPromises.unlink(path.join(__dirname, "fileData", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "fileData", "newFile.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "fileData", "newFile.txt"),
      "\n\n Thank you!"
    );
    await fsPromises.rename(
      path.join(__dirname, "fileData", "newFile.txt"),
      path.join(__dirname, "fileData", "completedFile.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "fileData", "completedFile.txt"),
      "utf8"
    );
    console.log("new data==>", newData);
  } catch (error) {
    console.log("error", error);
  }
};
fileOperation();
