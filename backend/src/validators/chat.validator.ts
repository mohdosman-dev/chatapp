import { z } from "zod";

export const createChatSchema = z
  .object({
    participants: z.array(z.string().trim().min(1)).min(2).optional(),
    participant: z.string().trim().min(1).optional(),
    isGroup: z.boolean().default(false).optional(),
    groupName: z.string().trim().min(2).optional(),
  })
  .refine(
    (data) => {
      const hasParticipants =
        Array.isArray(data.participants) && data.participants.length > 0;

      const hasParticipant =
        typeof data.participant === "string" &&
        data.participant.trim().length > 0;

      return hasParticipants || hasParticipant;
    },
    {
      message:
        "Either participants must be provided or participant must be set",
      path: ["participants"],
    }
  )
  .refine(
    (data) => {
      const isGroup = data.isGroup;
      const isGroupNameValid =
        typeof data.groupName === "string" && data.groupName.length > 2;
      return !isGroup || isGroupNameValid;
    },
    {
      message: "Group name must be provided",
      path: ["groupName"],
    }
  );

export const getChatIdSchema = z.object({
  id: z.string().trim().min(1),
});

export type CreateChatSchema = z.infer<typeof createChatSchema>;
export type ChatIdSchema = z.infer<typeof getChatIdSchema>;
