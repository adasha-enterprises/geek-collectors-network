import { BaseService, type Resources } from './Service';

/**
  * A demonstration controller for the HelloWorldService.
  *
  * The controller should handle all the logical work
  * and should have nothing to do with networking/routing
  * or even user validation! It doesn't care!
  */
export class HelloWorldController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) {}

  public greet(user: string) {
    return `Hello, ${user}!`;
  }
}

/**
  * A demonstration service that says hello to the user!
  *
  * The service should handle all the networking/routing
  * logic, and delegate the actual logical work to a controller.
  */
export class HelloWorldService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/hello');

    const controller = new HelloWorldController(resources);

    this.router.get('/world', (req, res) => {
      const { name = 'User' } = req.query;
      // Same as:
      // const name = req.query.name || 'User';
      // Former has strange syntax, pick your poison :)

      // Delegate the actual work to the controller
      const greeting = controller.greet(name.toString());

      res.status(200).json({
        message: greeting,
      });
    });
  }
}
