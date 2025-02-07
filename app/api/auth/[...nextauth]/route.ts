import NextAuth from "next-auth";
import { authOptions } from "./../../../lib/authOptions"; // Assure-toi d'avoir une configuration séparée pour les options

const handler = NextAuth(authOptions);

// Exportation nécessaire pour les requêtes GET et POST
export { handler as GET, handler as POST };