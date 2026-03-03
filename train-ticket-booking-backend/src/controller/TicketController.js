const TicketService = require("../service/TicketService");
const MessageConstant = require("../constant/MessageConstant");
const {
  getOkResponse,
  getGeneralResponse,
} = require("../utils/Response");
const { NotFoundException } = require("../utils/Exception");

class TicketController {
  // Add Ticket
  addTicket = async (req, res, next) => {
    try {
      const result = await TicketService.addTicket(req.body);
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.TICKET_ADDED_SUCCESSFULLY),
        result.body      );
    } catch (error) {
      console.error("Error in addTicket:", error);
      next(error);    }  };

  // Get Tickets by User ID
  getTicketByUserId = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const result = await TicketService.getTicketByUserId(userId);
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.SUCCESS),
        result.body      );
    } catch (error) {
      console.error("Error in getTicketByUserId:", error);
      next(error);    }  };

  // Get Ticket by Ticket ID
  getTicketById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await TicketService.getTicketById(id);
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.SUCCESS),
        result.body      );
    } catch (error) {
      console.error("Error in getTicketById:", error);
      next(error);    }  };

  // Update Ticket by ID
  updateTicketById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await TicketService.updateTicketById(id, req.body);
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.TICKET_UPDATED_SUCCESSFULLY),
        result.body      );
    } catch (error) {
      console.error("Error in updateTicketById:", error);
      next(error);    }  };

  // Soft Delete Ticket
  deleteTicketById = async (req, res, next) => {
    try {
      const { id } = req.params;
      await TicketService.deleteTicketById(id);
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.TICKET_DELETED_SUCCESSFULLY),
        null      );
    } catch (error) {
      console.error("Error in deleteTicketById:", error);
      next(error);    }  };

  // Get All Tickets (Future Events)
  getAllTicket = async (req, res, next) => {
    try {
      const result = await TicketService.getAllTicket();
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.TICKETS_FOUND_SUCCESSFULLY),
        result.body      );
    } catch (error) {
      console.error("Error in getAllTicket:", error);
      next(error);    }  };

  // Filter, Sort & Pagination
  getTicketListByFilterSort = async (req, res, next) => {
    try {
      const result = await TicketService.getTicketListByFilterSort(req.body);
      return getGeneralResponse(
        res,
        getOkResponse(MessageConstant.SUCCESS),
        result.body
      );    } catch (error) {
      console.error("Error in getTicketListByFilterSort:", error);
      next(error);    }  };

  // Export Tickets to Excel
  exportExcelTickets = async (req, res, next) => {
    try {
      const buffer = await TicketService.exportExcelTickets(req.body);

      if (!buffer) {
        throw new NotFoundException(MessageConstant.NO_DATA_FOUND);      }

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="Tickets.xlsx"'      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"      );

      return res.status(200).send(buffer);
    } catch (error) {
      console.error("Error in exportExcelTickets:", error);
      next(error);    }  };}

module.exports = new TicketController();
