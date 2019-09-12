const server = require("./api/server.js");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(
    `\n=== There is no safe space welcome to the thunder dome on ${port} ===\n`
  );
});
