// src/utils/dateFormatters.ts
import { format, formatDistanceToNow } from "date-fns";

// Format date to string
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM d, yyyy");
};

// Format date and time
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM d, yyyy h:mm a");
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};
