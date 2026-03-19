import { Router, type IRouter } from "express";
import { LoginBody, RegisterBody, UpdateProfileBody } from "@workspace/api-zod";

const router: IRouter = Router();

const mockUser = {
  id: "user-1",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  skinType: "Combination",
  age: 28,
  createdAt: new Date("2024-01-15").toISOString(),
};

router.post("/login", (req, res) => {
  try {
    const body = LoginBody.parse(req.body);
    res.json({
      token: "mock-jwt-token-" + Date.now(),
      user: { ...mockUser, email: body.email },
    });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/register", (req, res) => {
  try {
    const body = RegisterBody.parse(req.body);
    res.status(201).json({
      token: "mock-jwt-token-" + Date.now(),
      user: {
        ...mockUser,
        name: body.name,
        email: body.email,
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    res.status(400).json({ message: "Registration failed" });
  }
});

router.get("/profile", (_req, res) => {
  res.json(mockUser);
});

router.put("/profile", (req, res) => {
  try {
    const body = UpdateProfileBody.parse(req.body);
    res.json({ ...mockUser, ...body });
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});

export default router;
