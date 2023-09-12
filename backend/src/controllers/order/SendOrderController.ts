import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController{
  async handle(req: Request, res: Response){
    const {order_id} = req.body;

    const sendOrderService = new SendOrderService();
    
    const orderUpdated = await sendOrderService.execute({
      order_id
    });

    return res.json(orderUpdated);
  }
}

export {SendOrderController};