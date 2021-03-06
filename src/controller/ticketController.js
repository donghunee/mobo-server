const { response, errResponse } = require("../library/response");
const returnCode = require("../library/returnCode");
const ticketService = require("../service/ticketService");
const { verify } = require("../library/jwt");

async function getTicket(req, res) {
  try {
    const token = req.headers.authorization;
    const decoded = verify(token);

    if (decoded < -1) {
      console.log("토큰 오류");
      errResponse(res, returnCode.UNAUTHORIZED, "토큰 오류");
    }
    const userIdx = decoded.idx;
    const ticketData = await ticketService.getTicket(userIdx);
    console.log(ticketData);

    if (!ticketData) {
      console.log("존재하지 않는 파라미터");
      errResponse(res, returnCode.BAD_REQUEST, "존재하지 않는 파라미터");
    }

    console.log("티켓 상태 호출");
    response(res, returnCode.OK, "티켓 상태 성공", ticketData);
  } catch (error) {
    console.log(error.message);
    errResponse(res, returnCode.INTERNAL_SERVER_ERROR, "서버 오류");
  }
}

async function putTicket(req, res) {
  try {
    const token = req.headers.authorization;
    const decoded = verify(token);

    if (decoded < -1) {
      console.log("토큰 오류");
      errResponse(res, returnCode.UNAUTHORIZED, "토큰 오류");
    }

    const userIdx = decoded.idx;
    const userTicketData = req.body;
    const ticketData = await ticketService.putTicket(userIdx, userTicketData);

    if (!ticketData) {
      console.log("존재하지 않는 파라미터");
      errResponse(res, returnCode.BAD_REQUEST, "존재하지 않는 파라미터");
    }

    console.log("티켓 수정 상태 호출");
    response(res, returnCode.OK, "티켓 수정 상태 성공", ticketData);
  } catch (error) {
    console.log(error.message);
    errResponse(res, returnCode.INTERNAL_SERVER_ERROR, "서버 오류");
  }
}

module.exports = {
  getTicket,
  putTicket
};
