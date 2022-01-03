// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { Entity, model, property } from '@loopback/repository';
import {
  Message,
  Receiver,
  MessageType,
  MessageOptions,
  NotificationBindings,
  INotification,

} from 'loopback4-notifications';
import { inject } from '@loopback/core';

//Push notifications
@model({
  name: 'notifications',
})
export class Notification extends Entity implements Message {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      nullable: true,
    },
  })
  subject?: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'object',
    required: true,
  })
  receiver: Receiver;

  @property({
    type: 'number',
    required: true,
  })
  type: MessageType;

  @property({
    type: 'date',
    name: 'sent',
  })
  sentDate: Date;

  @property({
    type: 'object',
  })
  options?: MessageOptions;

  constructor(data?: Partial<Notification>) {
    super(data);
  }
}

export class NotificationController {
  constructor(

    @inject(NotificationBindings.NotificationProvider)
    private readonly notifProvider: INotification,

  ) { }

  @post('/notifications', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(Notification) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Notification, { exclude: ['id'] }),
          },
        },
      },
    })
    notification: Omit<Notification, 'id'>,
  ): Promise<void> {
    await this.notifProvider.publish(notification);
  }
}

@authenticate('jwt')
export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) { }

  @post('/todos', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Todo) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodo',
            exclude: ['id'],
          }),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  @get('/todos/{id}', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Todo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todo, { exclude: 'where' }) filter?: FilterExcludingWhere<Todo>,
  ): Promise<Todo> {
    return this.todoRepository.findById(id, filter);
  }

  @get('/todos', {
    responses: {
      '200': {
        description: 'Array of Todo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Todo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Todo) filter?: Filter<Todo>): Promise<Todo[]> {
    return this.todoRepository.find(filter);
  }

  @put('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<void> {
    await this.todoRepository.replaceById(id, todo);
  }

  @patch('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Todo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @del('/todos/{id}', {
    responses: {
      '204': {
        description: 'Todo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }

  @get('/todos/count', {
    responses: {
      '200': {
        description: 'Todo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(Todo) where?: Where<Todo>): Promise<Count> {
    return this.todoRepository.count(where);
  }

  @patch('/todos', {
    responses: {
      '200': {
        description: 'Todo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, { partial: true }),
        },
      },
    })
    todo: Todo,
    @param.where(Todo) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(todo, where);
  }
}
