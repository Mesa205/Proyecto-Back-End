export const response = (reply, code, ok, data, message) => {reply.code(code).send({ok,data,message,});};