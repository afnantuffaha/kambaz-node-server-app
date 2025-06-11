import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {

  app.post("/api/courses/:courseId/enroll", (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      
      const { courseId } = req.params;
      const enrollment = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
      res.json(enrollment);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });

  app.delete("/api/courses/:courseId/enroll", (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      
      const { courseId } = req.params;
      const result = enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
      res.json(result);
    } catch (error) {
      console.error("Error unenrolling from course:", error);
      res.status(500).json({ message: "Failed to unenroll from course" });
    }
  });

  app.get("/api/users/current/enrollments", (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      
      const enrollments = enrollmentsDao.findEnrollmentsForUser(currentUser._id);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching user enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  app.get("/api/courses/:courseId/users", (req, res) => {
    try {
      const { courseId } = req.params;
      const users = enrollmentsDao.findUsersForCourse(courseId);
      res.json(users);
    } catch (error) {
      console.error("Error fetching course users:", error);
      res.status(500).json({ message: "Failed to fetch course users" });
    }
  });
}