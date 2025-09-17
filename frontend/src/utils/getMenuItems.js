// src/utils/getMenuItems.js
import { tenantMenuItems, landlordMenuItems, caretakerMenuItems, adminMenuItems } from "../config/menuItems";

export const getMenuItemsByRole = (role) => {
  switch (role) {
    case "tenant":
      return tenantMenuItems;
    case "landlord":
      return landlordMenuItems;
    case "caretaker":
      return caretakerMenuItems;
    case "admin":
      return adminMenuItems;
    default:
      return [];
  }
};
