"use strict";

var Chan = require("../../models/chan");
var Msg = require("../../models/msg");

exports.commands = ["kick"];

exports.input = function(network, chan, cmd, args) {
	if (chan.type !== Chan.Type.CHANNEL) {
		chan.pushMessage(this, new Msg({
			type: Msg.Type.ERROR,
			text: `${cmd} command can only be used in channels.`
		}));

		return;
	}

	if (args.length !== 0) {
		var irc = network.irc;
		irc.raw("KICK", chan.name, args[0], args.slice(1).join(" "));
	}

	return true;
};
