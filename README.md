# nodeschool-cli
View available nodeschool modules and whether or not they are installed in your system. Tested on Mac OSX and Linux(Ubuntu).

[![Build status](https://travis-ci.org/avidas/nodeschool-cli.svg?branch=master)](https://travis-ci.org/avidas/nodeschool-cli)

## Installation

```bash
npm install -g nodeschool-cli
```

to get the `nodeschool-cli` command in your terminal.

## Usage

```
nodeschool-cli --list

  Prints which nodeschool modules are installed and not installed on your system.

nodeschool-cli --list
nodeschool-cli -l

  List all the nodeschool modules installed in the system
```

## Output

```
introtowebgl NOT INSTALLED
browserify-adventure INSTALLED
bug-clinic INSTALLED
bytewiser INSTALLED
shader-school NOT INSTALLED
regex-adventure INSTALLED
learnyoumongo INSTALLED
tower-of-babel INSTALLED
test-anything NOT INSTALLED
.
.

```

## TODO
* cache the module names
* install all?
* differentiate between finished/unfinished modules

## License

MIT

