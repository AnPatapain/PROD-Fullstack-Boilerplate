import {Message} from "@app/models/src/SampleModel";

export function getPrintableMessage(message: Message) {
  return `[${new Date(message.timeStamp).toLocaleDateString()}] ${message.content}`;
}