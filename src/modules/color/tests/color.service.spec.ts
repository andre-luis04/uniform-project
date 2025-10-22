import { Repository } from "typeorm";
import { ColorEntity } from "../entities/color.entity";
import { ColorService } from "../mcolor.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DESTRUCTION } from "dns";
import { NotFoundException } from "@nestjs/common";

const mockColorEntity = new ColorEntity();

describe("ColorService", () => {
  let service: ColorService;
  let repository: jest.Mocked<Repository<ColorEntity>>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ColorEntity],
      providers: [
        ColorService,
        { provide: getRepositoryToken(ColorEntity), useValue: mockRepository }, // Corrigido para ColorEntity
      ],
    }).compile();

    service = module.get<ColorService>(ColorService);
    repository = module.get(getRepositoryToken(ColorEntity));
  });

  describe("create", () => {
    it("deve criar uma color", async () => {
      const dto = { color: "vermelho" };
      const createdColor = new ColorEntity();
      repository.create.mockReturnValue(createdColor);
      repository.save.mockResolvedValue(createdColor);

      await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(createdColor);
    });
  });

  describe("findAll", () => {
    it("deve retornar uma lista de colors", async () => {
      repository.find.mockResolvedValue([mockColorEntity]);
      const result = await service.findAll();
      expect(result).toEqual([mockColorEntity]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("deve retornar uma cor pelo ID", async () => {
      repository.findOne.mockResolvedValue(mockColorEntity);
      const result = await service.findOne("uuid-123");
      expect(result).toEqual(mockColorEntity);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: "uuid-123" },
      });
    });
    it("deve retornar not found se não encontrar a cor", async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.findOne("notFound-uuid")).rejects.toThrow(
        NotFoundException
      );
    });
  });
  describe("patch", () => {
    it("deve atualizar uma color", async () => {
      const updateDto = { color: "azul" };
      const mockUpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      repository.findOne.mockResolvedValue(mockColorEntity);
      repository.update.mockResolvedValue(mockUpdateResult);

      const result = await service.update("uuid-123", updateDto);

      expect(repository.update).toHaveBeenCalledWith(
        mockColorEntity.id,
        updateDto
      );
      expect(result).toEqual(mockColorEntity);
    });
    it("deve retornar not found se não encontrar uma cor", async () => {
      const updateDto = { color: "azul" };
      repository.findOne.mockResolvedValue(null);
      await expect(service.update("uuid-notFound", updateDto)).rejects.toThrow(
        NotFoundException
      );
    });
  });
  describe("delete", () => {
    it('deve deletar uma color', async () => {
      repository.findOne.mockResolvedValue(mockColorEntity);
      repository.remove.mockResolvedValue(mockColorEntity);

      await service.remove('uuid-123');

      expect(repository.remove).toHaveBeenCalledWith(mockColorEntity);
    })
    it("deve retornar not found se não encontrar a color", async () => {
      repository.findOne.mockResolvedValue(null);
      await expect(service.remove("uuid-notFound")).rejects.toThrow(
        NotFoundException
      );
    });
  })
});
