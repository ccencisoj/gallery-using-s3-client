import { nanoid } from "nanoid";

const createTempId = ()=> {
  return `tempId-${nanoid()}`;
}

const isTempId = (value)=> {
  return String(value).startsWith("tempId-");
}

export { createTempId, isTempId };