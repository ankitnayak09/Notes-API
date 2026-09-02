import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ZodType } from "zod";
import { BadRequestError } from "../shared/utils/apiError.js";
import * as z from "zod";

export function validate<T extends ZodType<Record<string, unknown>>>(
  schema: T,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed: z.infer<T> = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if ("body" in parsed) req.body = parsed.body;
      if ("params" in parsed) Object.assign(req.params, parsed.params);
      if ("query" in parsed) Object.assign(req.query, parsed.query);
      // Overwrite with parsed data, this appplies zod's transforms/defaults too

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(
          new BadRequestError(err.issues.map((e) => e.message).join(", ")),
        );
      }
      return next(err);
    }
  };
}
