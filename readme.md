
# TrelloSpot
> Trello and Spotify API integration 

## Install
Clone or download the repository
Install dependencies

```bash
npm istall
```
## Usage

Run build and start command to run the full process
  ```bash
npm run build
npm start
```
Running with the dev command will auto refresh on changes and allow to test without building
  ```bash
npm run dev
```
The test command will run a test suite with a code coverage report
  ```bash
npm test
```

It is also possible to run the process for any given artist name
  ```bash
npm run start:custom -- "ARTIST NAME"
```
or
  ```bash
npm run dev:custom -- "ARTIST NAME"
```
Example
  ```bash
npm run start:custom -- "Bob Dylan"
```
## License
[MIT](http://vjpr.mit-license.org)