import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

import { OfferInterface } from '../../shared/types/index.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DefaultUserService } from '../../shared/modules/user/index.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/offer/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: OfferInterface, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: OfferInterface) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    await this.offerService.create({
      userId: user.id,
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      rating: offer.rating,
      propertyType: offer.propertyType,
      numberOfRooms: offer.numberOfRooms,
      numberOfGuests: offer.numberOfGuests,
      price: offer.price,
      amenities: offer.amenities,
      numberOfComments: offer.numberOfComments,
      offerCoordinates: offer.offerCoordinates,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string,
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}

// previous import implementation

// import { Command } from './command.interface.js';
// import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
//
// import { getErrorMessage } from '../../shared/helpers/index.js';
// import { OfferInterface } from '../../shared/types/index.js';
//
// export class ImportCommand implements Command {
//   private onImportedOffer(offer: OfferInterface): void {
//     console.info(offer);
//   }
//
//   private onCompleteImport(count: number) {
//     console.info(`${count} rows imported.`);
//   }
//
//   public getName(): string {
//     return '--import';
//   }
//
//   public async execute(...parameters: string[]): Promise<void> {
//     const [filename] = parameters;
//     const fileReader = new TSVFileReader(filename.trim());
//
//     fileReader.on('line', this.onImportedOffer);
//     fileReader.on('end', this.onCompleteImport);
//
//     try {
//       fileReader.read();
//     } catch (error) {
//       console.error(`Can't import data from file: ${filename}`);
//       console.error(getErrorMessage(error));
//     }
//   }
// }
