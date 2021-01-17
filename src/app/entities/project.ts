import { Type } from "class-transformer";
import { Todo } from "./todo";

export class Project {
  public title: string;

  @Type(() => Todo)
  public todos: Todo[];
}
