import React, { useState } from 'react';
import { useMemo } from 'react';
import { errorsDatabase } from '../data/errorsDatabase';
import { Code, Copy, Check, Settings, Download } from 'lucide-react';

interface CodeGeneratorProps {
  searchTerm?: string;
}

export default function CodeGenerator({ searchTerm = '' }: CodeGeneratorProps) {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<'vanilla' | 'gin' | 'echo' | 'fiber'>('vanilla');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter scenarios based on search term
  const filteredScenarios = useMemo(() => {
  const scenarios = [
    {
      id: 'user-registration',
      title: 'User Registration',
      description: 'Handle user registration with validation',
      errors: ['MissingParameter', 'InvalidParameter', 'Conflict'],
      template: {
        vanilla: `package main

import (
    "encoding/json"
    "net/http"
    "github.com/syntaxlabz/errors"
)

type RegisterRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
    Name     string \`json:"name"\`
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
    var req RegisterRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    // Check for missing parameters
    if req.Email == "" {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(httperrors.MissingParameter("email"))
        return
    }
    
    if req.Password == "" {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(httperrors.MissingParameter("password"))
        return
    }

    // Validate email format
    if !isValidEmail(req.Email) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(httperrors.InvalidParameter("email", "invalid email format"))
        return
    }

    // Check if user already exists
    if userExists(req.Email) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(409)
        json.NewEncoder(w).Encode(httperrors.Conflict("email already exists"))
        return
    }

    // Create user...
    user, err := createUser(req)
    if err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(500)
        json.NewEncoder(w).Encode(httperrors.InternalServerError("failed to create user"))
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}`,
        gin: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/syntaxlabz/errors"
)

type RegisterRequest struct {
    Email    string \`json:"email" binding:"required"\`
    Password string \`json:"password" binding:"required"\`
    Name     string \`json:"name" binding:"required"\`
}

func registerHandler(c *gin.Context) {
    var req RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request format"})
        return
    }

    // Validate email format
    if !isValidEmail(req.Email) {
        c.JSON(400, httperrors.InvalidParameter("email", "invalid email format"))
        return
    }

    // Check if user already exists
    if userExists(req.Email) {
        c.JSON(409, httperrors.Conflict("email already exists"))
        return
    }

    // Create user...
    user, err := createUser(req)
    if err != nil {
        c.JSON(500, httperrors.InternalServerError("failed to create user"))
        return
    }

    c.JSON(201, user)
}

func main() {
    r := gin.Default()
    r.POST("/register", registerHandler)
    r.Run(":8080")
}`,
        echo: `package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/syntaxlabz/errors"
)

type RegisterRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
    Name     string \`json:"name"\`
}

func registerHandler(c echo.Context) error {
    var req RegisterRequest
    if err := c.Bind(&req); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request format"})
    }

    // Check for missing parameters
    if req.Email == "" {
        return c.JSON(400, httperrors.MissingParameter("email"))
    }
    
    if req.Password == "" {
        return c.JSON(400, httperrors.MissingParameter("password"))
    }

    // Validate email format
    if !isValidEmail(req.Email) {
        return c.JSON(400, httperrors.InvalidParameter("email", "invalid email format"))
    }

    // Check if user already exists
    if userExists(req.Email) {
        return c.JSON(409, httperrors.Conflict("email already exists"))
    }

    // Create user...
    user, err := createUser(req)
    if err != nil {
        return c.JSON(500, httperrors.InternalServerError("failed to create user"))
    }

    return c.JSON(201, user)
}

func main() {
    e := echo.New()
    e.POST("/register", registerHandler)
    e.Logger.Fatal(e.Start(":8080"))
}`,
        fiber: `package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/syntaxlabz/errors"
)

type RegisterRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
    Name     string \`json:"name"\`
}

func registerHandler(c *fiber.Ctx) error {
    var req RegisterRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
    }

    // Check for missing parameters
    if req.Email == "" {
        return c.Status(400).JSON(httperrors.MissingParameter("email"))
    }
    
    if req.Password == "" {
        return c.Status(400).JSON(httperrors.MissingParameter("password"))
    }

    // Validate email format
    if !isValidEmail(req.Email) {
        return c.Status(400).JSON(httperrors.InvalidParameter("email", "invalid email format"))
    }

    // Check if user already exists
    if userExists(req.Email) {
        return c.Status(409).JSON(httperrors.Conflict("email already exists"))
    }

    // Create user...
    user, err := createUser(req)
    if err != nil {
        return c.Status(500).JSON(httperrors.InternalServerError("failed to create user"))
    }

    return c.Status(201).JSON(user)
}

func main() {
    app := fiber.New()
    app.Post("/register", registerHandler)
    app.Listen(":8080")
}`
      }
    },
    {
      id: 'authentication',
      title: 'User Authentication',
      description: 'Handle user login with authentication errors',
      errors: ['MissingParameter', 'Unauthorized', 'RateLimited'],
      template: {
        vanilla: `package main

import (
    "encoding/json"
    "net/http"
    "github.com/syntaxlabz/errors"
)

type LoginRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
    var req LoginRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    // Check for missing parameters
    if req.Email == "" {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(httperrors.MissingParameter("email"))
        return
    }
    
    if req.Password == "" {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(httperrors.MissingParameter("password"))
        return
    }

    // Check rate limiting
    if rateLimiter.Exceeded(req.Email) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(429)
        json.NewEncoder(w).Encode(httperrors.RateLimited("too many login attempts"))
        return
    }

    // Authenticate user
    user, err := authenticateUser(req.Email, req.Password)
    if err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(401)
        json.NewEncoder(w).Encode(httperrors.Unauthorized("invalid credentials"))
        return
    }

    // Generate JWT token
    token, err := generateJWT(user)
    if err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(500)
        json.NewEncoder(w).Encode(httperrors.InternalServerError("failed to generate token"))
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "user":  user,
        "token": token,
    })
}`,
        gin: `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/syntaxlabz/errors"
)

type LoginRequest struct {
    Email    string \`json:"email" binding:"required"\`
    Password string \`json:"password" binding:"required"\`
}

func loginHandler(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request format"})
        return
    }

    // Check rate limiting
    if rateLimiter.Exceeded(req.Email) {
        c.JSON(429, httperrors.RateLimited("too many login attempts"))
        return
    }

    // Authenticate user
    user, err := authenticateUser(req.Email, req.Password)
    if err != nil {
        c.JSON(401, httperrors.Unauthorized("invalid credentials"))
        return
    }

    // Generate JWT token
    token, err := generateJWT(user)
    if err != nil {
        c.JSON(500, httperrors.InternalServerError("failed to generate token"))
        return
    }

    c.JSON(200, gin.H{
        "user":  user,
        "token": token,
    })
}`,
        echo: `package main

import (
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/syntaxlabz/errors"
)

type LoginRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
}

func loginHandler(c echo.Context) error {
    var req LoginRequest
    if err := c.Bind(&req); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request format"})
    }

    // Check for missing parameters
    if req.Email == "" {
        return c.JSON(400, httperrors.MissingParameter("email"))
    }
    
    if req.Password == "" {
        return c.JSON(400, httperrors.MissingParameter("password"))
    }

    // Check rate limiting
    if rateLimiter.Exceeded(req.Email) {
        return c.JSON(429, httperrors.RateLimited("too many login attempts"))
    }

    // Authenticate user
    user, err := authenticateUser(req.Email, req.Password)
    if err != nil {
        return c.JSON(401, httperrors.Unauthorized("invalid credentials"))
    }

    // Generate JWT token
    token, err := generateJWT(user)
    if err != nil {
        return c.JSON(500, httperrors.InternalServerError("failed to generate token"))
    }

    return c.JSON(200, map[string]interface{}{
        "user":  user,
        "token": token,
    })
}`,
        fiber: `package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/syntaxlabz/errors"
)

type LoginRequest struct {
    Email    string \`json:"email"\`
    Password string \`json:"password"\`
}

func loginHandler(c *fiber.Ctx) error {
    var req LoginRequest
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request format"})
    }

    // Check for missing parameters
    if req.Email == "" {
        return c.Status(400).JSON(httperrors.MissingParameter("email"))
    }
    
    if req.Password == "" {
        return c.Status(400).JSON(httperrors.MissingParameter("password"))
    }

    // Check rate limiting
    if rateLimiter.Exceeded(req.Email) {
        return c.Status(429).JSON(httperrors.RateLimited("too many login attempts"))
    }

    // Authenticate user
    user, err := authenticateUser(req.Email, req.Password)
    if err != nil {
        return c.Status(401).JSON(httperrors.Unauthorized("invalid credentials"))
    }

    // Generate JWT token
    token, err := generateJWT(user)
    if err != nil {
        return c.Status(500).JSON(httperrors.InternalServerError("failed to generate token"))
    }

    return c.JSON(fiber.Map{
        "user":  user,
        "token": token,
    })
}`
      }
    },
    {
      id: 'resource-crud',
      title: 'Resource CRUD Operations',
      description: 'Handle resource operations with proper error handling',
      errors: ['NotFound', 'Forbidden', 'Conflict'],
      template: {
        vanilla: `package main

import (
    "encoding/json"
    "net/http"
    "github.com/syntaxlabz/errors"
)

func getResourceHandler(w http.ResponseWriter, r *http.Request) {
    // Extract resource ID from URL
    id := extractIDFromPath(r.URL.Path)
    
    // Get user from auth context
    user := getUserFromContext(r.Context())
    if user == nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(401)
        json.NewEncoder(w).Encode(httperrors.Unauthorized("authentication required"))
        return
    }

    // Find resource
    resource, err := getResourceByID(id)
    if err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(404)
        json.NewEncoder(w).Encode(httperrors.NotFound("resource"))
        return
    }

    // Check permissions
    if !canAccessResource(user, resource) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(403)
        json.NewEncoder(w).Encode(httperrors.Forbidden("insufficient permissions"))
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resource)
}

func updateResourceHandler(w http.ResponseWriter, r *http.Request) {
    id := extractIDFromPath(r.URL.Path)
    user := getUserFromContext(r.Context())
    
    if user == nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(401)
        json.NewEncoder(w).Encode(httperrors.Unauthorized("authentication required"))
        return
    }

    // Check if resource exists
    resource, err := getResourceByID(id)
    if err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(404)
        json.NewEncoder(w).Encode(httperrors.NotFound("resource"))
        return
    }

    // Check permissions
    if !canModifyResource(user, resource) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(403)
        json.NewEncoder(w).Encode(httperrors.Forbidden("insufficient permissions to modify resource"))
        return
    }

    // Parse update data
    var updateData map[string]interface{}
    if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(httperrors.InvalidParameter("body", "invalid JSON format"))
        return
    }

    // Update resource
    updatedResource, err := updateResource(id, updateData)
    if err != nil {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(500)
        json.NewEncoder(w).Encode(httperrors.InternalServerError("failed to update resource"))
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(updatedResource)
}`,
        gin: `package main

import (
    "strconv"
    "github.com/gin-gonic/gin"
    "github.com/syntaxlabz/errors"
)

func getResourceHandler(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(400, httperrors.InvalidParameter("id", "must be a valid integer"))
        return
    }

    // Get user from auth middleware
    user, exists := c.Get("user")
    if !exists {
        c.JSON(401, httperrors.Unauthorized("authentication required"))
        return
    }

    // Find resource
    resource, err := getResourceByID(id)
    if err != nil {
        c.JSON(404, httperrors.NotFound("resource"))
        return
    }

    // Check permissions
    if !canAccessResource(user, resource) {
        c.JSON(403, httperrors.Forbidden("insufficient permissions"))
        return
    }

    c.JSON(200, resource)
}

func updateResourceHandler(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(400, httperrors.InvalidParameter("id", "must be a valid integer"))
        return
    }

    user, exists := c.Get("user")
    if !exists {
        c.JSON(401, httperrors.Unauthorized("authentication required"))
        return
    }

    // Check if resource exists
    resource, err := getResourceByID(id)
    if err != nil {
        c.JSON(404, httperrors.NotFound("resource"))
        return
    }

    // Check permissions
    if !canModifyResource(user, resource) {
        c.JSON(403, httperrors.Forbidden("insufficient permissions to modify resource"))
        return
    }

    // Parse update data
    var updateData map[string]interface{}
    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(400, httperrors.InvalidParameter("body", "invalid JSON format"))
        return
    }

    // Update resource
    updatedResource, err := updateResource(id, updateData)
    if err != nil {
        c.JSON(500, httperrors.InternalServerError("failed to update resource"))
        return
    }

    c.JSON(200, updatedResource)
}`,
        echo: `package main

import (
    "net/http"
    "strconv"
    "github.com/labstack/echo/v4"
    "github.com/syntaxlabz/errors"
)

func getResourceHandler(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.JSON(400, httperrors.InvalidParameter("id", "must be a valid integer"))
    }

    // Get user from auth middleware
    user := c.Get("user")
    if user == nil {
        return c.JSON(401, httperrors.Unauthorized("authentication required"))
    }

    // Find resource
    resource, err := getResourceByID(id)
    if err != nil {
        return c.JSON(404, httperrors.NotFound("resource"))
    }

    // Check permissions
    if !canAccessResource(user, resource) {
        return c.JSON(403, httperrors.Forbidden("insufficient permissions"))
    }

    return c.JSON(200, resource)
}

func updateResourceHandler(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.JSON(400, httperrors.InvalidParameter("id", "must be a valid integer"))
    }

    user := c.Get("user")
    if user == nil {
        return c.JSON(401, httperrors.Unauthorized("authentication required"))
    }

    // Check if resource exists
    resource, err := getResourceByID(id)
    if err != nil {
        return c.JSON(404, httperrors.NotFound("resource"))
    }

    // Check permissions
    if !canModifyResource(user, resource) {
        return c.JSON(403, httperrors.Forbidden("insufficient permissions to modify resource"))
    }

    // Parse update data
    var updateData map[string]interface{}
    if err := c.Bind(&updateData); err != nil {
        return c.JSON(400, httperrors.InvalidParameter("body", "invalid JSON format"))
    }

    // Update resource
    updatedResource, err := updateResource(id, updateData)
    if err != nil {
        return c.JSON(500, httperrors.InternalServerError("failed to update resource"))
    }

    return c.JSON(200, updatedResource)
}`,
        fiber: `package main

import (
    "strconv"
    "github.com/gofiber/fiber/v2"
    "github.com/syntaxlabz/errors"
)

func getResourceHandler(c *fiber.Ctx) error {
    id, err := strconv.Atoi(c.Params("id"))
    if err != nil {
        return c.Status(400).JSON(httperrors.InvalidParameter("id", "must be a valid integer"))
    }

    // Get user from auth middleware
    user := c.Locals("user")
    if user == nil {
        return c.Status(401).JSON(httperrors.Unauthorized("authentication required"))
    }

    // Find resource
    resource, err := getResourceByID(id)
    if err != nil {
        return c.Status(404).JSON(httperrors.NotFound("resource"))
    }

    // Check permissions
    if !canAccessResource(user, resource) {
        return c.Status(403).JSON(httperrors.Forbidden("insufficient permissions"))
    }

    return c.JSON(resource)
}

func updateResourceHandler(c *fiber.Ctx) error {
    id, err := strconv.Atoi(c.Params("id"))
    if err != nil {
        return c.Status(400).JSON(httperrors.InvalidParameter("id", "must be a valid integer"))
    }

    user := c.Locals("user")
    if user == nil {
        return c.Status(401).JSON(httperrors.Unauthorized("authentication required"))
    }

    // Check if resource exists
    resource, err := getResourceByID(id)
    if err != nil {
        return c.Status(404).JSON(httperrors.NotFound("resource"))
    }

    // Check permissions
    if !canModifyResource(user, resource) {
        return c.Status(403).JSON(httperrors.Forbidden("insufficient permissions to modify resource"))
    }

    // Parse update data
    var updateData map[string]interface{}
    if err := c.BodyParser(&updateData); err != nil {
        return c.Status(400).JSON(httperrors.InvalidParameter("body", "invalid JSON format"))
    }

    // Update resource
    updatedResource, err := updateResource(id, updateData)
    if err != nil {
        return c.Status(500).JSON(httperrors.InternalServerError("failed to update resource"))
    }

    return c.JSON(updatedResource)
}`
      }
    }
  ];

  if (!searchTerm) return scenarios;
    
    const term = searchTerm.toLowerCase();
    return scenarios.filter(scenario => 
      scenario.title.toLowerCase().includes(term) ||
      scenario.description.toLowerCase().includes(term) ||
      scenario.errors.some(errorName => 
        errorsDatabase[errorName]?.name.toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  const generateCode = () => {
    const scenario = filteredScenarios.find(s => s.id === selectedScenario);
    if (scenario) {
      setGeneratedCode(scenario.template[selectedFramework]);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedScenario}-${selectedFramework}.go`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Code Generator</h2>
        <p className="text-gray-400 text-lg">
          Generate production-ready Go code with proper error handling for common scenarios
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Settings size={16} className="inline mr-2" />
              Choose a Scenario
            </label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a scenario...</option>
              {filteredScenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </option>
              ))}
            </select>
            {selectedScenario && (
              <p className="text-gray-400 text-sm mt-2">
                {filteredScenarios.find(s => s.id === selectedScenario)?.description}
              </p>
            )}
            {searchTerm && filteredScenarios.length === 0 && (
              <p className="text-yellow-400 text-sm mt-2">
                No scenarios match your search. Try a different term.
              </p>
            )}
          </div>

          {/* Framework Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              <Code size={16} className="inline mr-2" />
              Choose Framework
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['vanilla', 'gin', 'echo', 'fiber'] as const).map((framework) => (
                <button
                  key={framework}
                  onClick={() => setSelectedFramework(framework)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    selectedFramework === framework
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                  }`}
                >
                  {framework === 'vanilla' ? 'Standard Go' : framework.charAt(0).toUpperCase() + framework.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={generateCode}
            disabled={!selectedScenario}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
          >
            <Code size={16} />
            <span>Generate Code</span>
          </button>
        </div>
      </div>

      {/* Error Types Used */}
      {selectedScenario && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Error Types Used in This Scenario</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredScenarios.find(s => s.id === selectedScenario)?.errors.map((errorName) => {
              const error = errorsDatabase[errorName];
              return (
                <div key={errorName} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{error.name}</h4>
                    <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                      {error.httpStatus}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{error.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Generated Code */}
      {generatedCode && (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-lg font-medium text-white">Generated Code</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
              
              <button
                onClick={downloadCode}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm text-white transition-colors"
              >
                <Download size={14} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <pre className="text-sm text-gray-300 overflow-x-auto bg-gray-900 rounded border border-gray-600 p-4">
              <code>{generatedCode}</code>
            </pre>
          </div>
        </div>
      )}

      {!generatedCode && (
        <div className="text-center py-12">
          <Code size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">Ready to Generate</h3>
          <p className="text-gray-500">Select a scenario and framework to generate production-ready code</p>
        </div>
      )}
    </div>
  );
}