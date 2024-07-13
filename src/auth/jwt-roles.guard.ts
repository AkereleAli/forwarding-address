// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtGuard } from './jwt-auth.guard';
// import { RolesGuard } from './roles.guard';

// @Injectable()
// export class JwtRolesGuard implements CanActivate {
//   constructor(
//     private readonly jwtAuthGuard: JwtGuard,
//     private readonly rolesGuard: RolesGuard,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const isAuthenticated = await this.jwtAuthGuard.canActivate(context);
//     if (!isAuthenticated) {
//       return false;
//     }
//     return this.rolesGuard.canActivate(context);
//   }
// }
