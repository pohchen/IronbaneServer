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

// chat command API
// items - item templates (from datahandler)
// units - unit templates (from datahandler)
// worldHandler - worldHandler reference
// chatHandler - reference to general chat utils
module.exports = function(items, units, worldHandler, chatHandler) {
    var _ = require('underscore');

    return {
        requiresEditor: false,
        action: function(unit, target, params, errorMessage) {
            var rooms = chatHandler.listRooms(),
                match;

            // if we're attempting to match a user or room
            if(_.isString(target)) {
                // check for case insensitive way
                match = _.find(rooms, function(room) {
                    return room.toLowerCase() === target.toLowerCase();
                });
            }

            if(target && !match) {
                errorMessage = "No such user or room.";
            } else {
                chatHandler.say(unit, params.join(' '), match); // OK to pass null for match here, that's "global"
            }

            return {
                errorMessage: errorMessage
            };
        }
    };
};
