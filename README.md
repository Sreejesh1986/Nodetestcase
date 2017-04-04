Things that need to be fixed have to commented with //FixMe.

Coding style to be followed: https://docs.npmjs.com/misc/coding-style

Versioning style to be used: https://docs.npmjs.com/getting-started/semantic-versioning

Custom Scripts have to be run using the command: "npm run custom_script"

Set up Git config like so:
Setup user name: git config user.name "user_name"
Setup default editor like so:
Notepad++ > git config core.editor "'C:/Program Files (x86)/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
OR
Notepad > git config core.editor "notepad"

In Production run "npm install --production" and not "npm install". This way we will not install any devdependencies provided in our package.json file in production.