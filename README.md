Build with: jasmine and dropbox

Getting started:

1. Install npm: npm install npm@latest -g

2. Install npm packages: npm install

3. Write in your Access token in "ACCESS_TOKEN" variable in "spec/test.spec.js" 

4. Add big file in folder "/files" (github have restrictions for bug files)

5. Write in your big file`s name in commented paths

6. Uncomment code

7. Run script: npm test

Usage:

Script is build for testing DropBox API. There are 6 tests:

1. Uploading small file
2. Uploading big file
3. Getting metadata of small file
4. Getting metadata of big file
5. Deleting small file
6. Deleting big file