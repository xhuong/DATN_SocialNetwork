import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from ".";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // const { role: reqRole } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => role === reqRole);
    const request = context.switchToHttp().getRequest();
    const requestRole = request["user"]["role"];
    return requiredRoles.some((role) => role === requestRole);
  }
}
