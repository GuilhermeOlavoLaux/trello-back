const User = require('../model/User')
import express = require('express')

export = {
  async validateUserAndPassword(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { userName, password } = request.body

      if (!userName || !password) {
        return response.status(400).json({ error: 'Missing name or password' })
      }
      next()
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}
