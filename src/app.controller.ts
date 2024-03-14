import { Controller, Get, Render } from "@nestjs/common";
import { DataService } from "./data/data.service";
import { Data } from "./schemas/data.schema";

@Controller()
export class AppController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  @Render("index")
  async getHello(): Promise<object> {
    const lastData = (await this.dataService.getLast()) as Data & { createdAt: Date };
    return {
      Sensor: lastData.sensor,
      Botao: lastData.botao,
      LigaRobo: lastData.LigaRobo,
      ResetContador: lastData.ResetContador,
      ValorContagem: lastData.ValorContagem,
      createdAt: lastData.createdAt,
    };
  }
}
