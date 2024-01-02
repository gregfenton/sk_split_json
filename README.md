A quick hack project to split a large JSON file into a series of smaller JSON files.

## Usage

```js
1. git clone https://github.com/gregfenton/sk_split_json.git
2. cd sk_split_json
3. npm install
4. node create_test_json.js
5. node split_json.js
```

Step #4 will create a large test JSON file named `large_test_data.json`

Step #5 will load that data and split the results into a set of files in the "output" directory.