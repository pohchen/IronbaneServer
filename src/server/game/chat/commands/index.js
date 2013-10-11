/*
    This file is part of Ironbane MMO.

    Ironbane MMO is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Ironbane MMO is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Ironbane MMO.  If not, see <http://www.gnu.org/licenses/>.
*/

var fs = require('q-io/fs'),
    path = require('path'),
    _ = require('underscore');

// chat command API
// items - item templates (from datahandler)
// units - unit templates (from datahandler)
// world - worldHandler reference
module.exports = function(items, units, world) {

    var Commands = {};

    // dynamically load all commands
    fs.list(__dirname).then(function(files) {
        _.each(files, function(file) {
            if(file !== 'index.js') {
                var cmd = require(__dirname + '/' + file)(items, units, world, Commands),
                    cmdName = cmd.name || path.basename(file, '.js').toLowerCase();

                console.log('loading chat command: ', file, 'named: ', cmdName);

                Commands[cmdName] = cmd;
            }
        });
    }, function(err) {
        console.log('error listing chat commands!');
    });

    return Commands;
};