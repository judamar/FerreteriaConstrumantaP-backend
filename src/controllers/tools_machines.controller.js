import ToolMachine from '../models/tool_machine.model.js'

const getAllToolMachines = async (req, res) => {
  try {
    const result = await ToolMachine.getAll()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getToolMachineById = async (req, res) => {
  try {
    const result = await ToolMachine.getById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const insertToolMachine = async (req, res) => {
  try {
    const result = await ToolMachine.createToolMachine(req.body.herramienta_maquina)
    res.status(201).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateToolMachine = async (req, res) => {
  try {
    const result = await ToolMachine.updateToolMachine(req.params.id, req.body.herramienta_maquina)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteToolMachine = async (req, res) => {
  try {
    const result = await ToolMachine.deleteToolMachine(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  getAllToolMachines,
  getToolMachineById,
  insertToolMachine,
  updateToolMachine,
  deleteToolMachine
}
