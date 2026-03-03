const MessageConstant = require("../constant/MessageConstant");
const { formatStatus } = require("../helper/DataHelper");
const TicketRepository = require("../repository/TicketRepository");
const {
  InvalidRequestException,
  NotFoundException,
} = require("../utils/Exception");
const ExcelJS = require("exceljs");

class TicketService {
  // Add a ticket
  async addTicket(data) {
    if (!data)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const result = await TicketRepository.addTicket(data);
    return { success: true, body: result.dataValues };
  }

  // Get tickets by userId
  async getTicketByUserId(userId) {
    if (!userId)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const result = await TicketRepository.getTicketByUserId(userId);
    if (!result || result.length === 0)
      throw new NotFoundException(MessageConstant.NO_DATA_FOUND);

    return { success: true, body: result };
  }

  // Get ticket by ticketId
  async getTicketById(ticketId) {
    if (!ticketId)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const result = await TicketRepository.getTicketById(ticketId);
    if (!result) throw new NotFoundException(MessageConstant.NO_DATA_FOUND);

    return { success: true, body: result };
  }

  // Update a ticket by ticketId
  async updateTicketById(id, data) {
    if (!id || !data)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const [, updatedResult] = await TicketRepository.updateTicketById(id, data);

    return { success: true, body: updatedResult?.[0] || null };
  }

  // Soft delete a ticket by id
  async deleteTicketById(id) {
    if (!id)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const result = await TicketRepository.deleteTicketById(id);
    if (!result?.[0]) throw new NotFoundException(MessageConstant.NO_DATA_FOUND);

    return { success: true, body: result };
  }

  // Get all tickets (future events)
  async getAllTicket() {
    const result = await TicketRepository.getAllTicket();
    return { success: true, body: result };
  }

  // Get ticket list with filter, sort, and pagination
  async getTicketListByFilterSort(req) {
    if (!req || !req?.filter)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const result = await TicketRepository.getTicketListByFilterSort(
      req?.filter,
      req?.sort,
      req?.page
    );

    return { success: true, body: result };
  }

  // Export tickets to Excel
  async exportExcelTickets(req) {
    if (!req || !req?.filter)
      throw new InvalidRequestException(
        MessageConstant.INVALID_REQUEST_DESCRIPTION
      );

    const tickets = await TicketRepository.getTicketListByFilterSort(
      { ...req?.filter, isSkipPagination: true },
      req?.sort,
      req?.page
    );

    if (!tickets.length) {
      throw new NotFoundException(MessageConstant.TICKET_NOT_FOUND);
    }

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tickets");

    // Define columns
    worksheet.columns = [
      { header: "Sr No.", width: 8 },
      { header: "User Name", width: 20 },
      { header: "Event Name", width: 30 },
      { header: "Event Date", width: 18 },
      { header: "Event Time", width: 15 },
      { header: "Seats", width: 20 },
      { header: "Status", width: 15 },
    ];

    const naValue = "N/A";

    // Add rows
    tickets.forEach((ticket, index) => {
      const ticketData = ticket?.dataValues || ticket;
      worksheet.addRow([
        index + 1,
        ticketData?.user?.name || naValue,
        ticketData?.event?.title || naValue,
        ticketData?.event?.date || naValue,
        ticketData?.event?.time || naValue,
        Array.isArray(ticketData?.seats) ? ticketData?.seats.join(", ") : naValue,
        formatStatus(ticketData?.event?.status, naValue),
      ]);
    });

    // Bold header
    worksheet.getRow(1).font = { bold: true };

    // Return as buffer
    return workbook.xlsx.writeBuffer();
  }
}

module.exports = new TicketService();
