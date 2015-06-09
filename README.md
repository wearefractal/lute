[![NPM version](https://badge.fury.io/js/lute.png)](http://badge.fury.io/js/lute)

## Information

<table>
<tr>
<td>Package</td><td>lute</td>
</tr>
<tr>
<td>Static dev server</td>
<td></td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

`$ npm install -g lute`

Running 'lute' in a directory will serve that dir and set up LiveReload - no need to have the plugin as it will inject the livereload script into your index

`$ lute`

Serves current directory on default port (8080).  Will find an open port if it's not available.

### Options

<table>
<tr>
<td>Flag</td><td>Default</td><td>Description</td>
</tr>
<tr>
<td>-o</td>
<td></td>
<td>Opens your browser</td>
</tr>
<tr>
<td>-i</td>
<td></td>
<td>Set paths to ignore when using the watcher, relative to the path `lute` is launched from (use a comma-delimited list to pass multiple paths)
</td>
</tr>
<tr>
<td>-p</td>
<td>8080</td>
<td>Select the port to serve the site on, will find an open port if not available
</td>
</tr>
<tr>
<td>-l</td>
<td>35729</td>
<td>Select the port for live-reload, will find an open port if not available
</td>
</tr>
</table>

## TODO

- watch and compile stuff
- gh-pages integration

## LICENSE

(MIT License)

Copyright (c) 2013 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
