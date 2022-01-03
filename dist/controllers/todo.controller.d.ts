import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { Entity } from '@loopback/repository';
import { Message, Receiver, MessageType, MessageOptions, INotification } from 'loopback4-notifications';
export declare class Notification extends Entity implements Message {
    id?: string;
    subject?: string;
    body: string;
    receiver: Receiver;
    type: MessageType;
    sentDate: Date;
    options?: MessageOptions;
    constructor(data?: Partial<Notification>);
}
export declare class NotificationController {
    private readonly notifProvider;
    constructor(notifProvider: INotification);
    create(notification: Omit<Notification, 'id'>): Promise<void>;
}
export declare class TodoController {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    create(todo: Omit<Todo, 'id'>): Promise<Todo>;
    findById(id: number, filter?: FilterExcludingWhere<Todo>): Promise<Todo>;
    find(filter?: Filter<Todo>): Promise<Todo[]>;
    replaceById(id: number, todo: Todo): Promise<void>;
    updateById(id: number, todo: Todo): Promise<void>;
    deleteById(id: number): Promise<void>;
    count(where?: Where<Todo>): Promise<Count>;
    updateAll(todo: Todo, where?: Where<Todo>): Promise<Count>;
}
