import { Router } from 'express'
import ToolsMachines from '../controllers/tools_machines.controller.js'

const ToolsMachinesRouter = Router()

ToolsMachinesRouter
  .get('/', ToolsMachines.getAllToolMachines)
  .get('/:id', ToolsMachines.getToolMachineById)
  .post('/', ToolsMachines.insertToolMachine)
  .put('/:id', ToolsMachines.updateToolMachine)
  .delete('/:id', ToolsMachines.deleteToolMachine)

export default ToolsMachinesRouter
