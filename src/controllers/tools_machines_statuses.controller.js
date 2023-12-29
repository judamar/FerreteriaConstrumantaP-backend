import ToolMachineStatus from '../models/tool_machine_status.model'

const getAllStatus = async (req, res) => {
  try {
    const result = await ToolMachineStatus.getAllStatus()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message })
  }
}

const getStatusById = async (req, res) => {
  try {
    const result = await ToolMachineStatus.getStatusById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message })
  }
}

const insertStatus = async (req, res) => {
  try {
    const result = await ToolMachineStatus.insertStatus(req.body.estado)
    res.status(201).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const result = await ToolMachineStatus.updateStatus(req.params.id, req.body.estado)
    res.status(201).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message })
  }
}

const deleteStatus = async (req, res) => {
  try {
    const result = await ToolMachineStatus.deleteStatus(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message })
  }
}

export default {
  getAllStatus,
  getStatusById,
  insertStatus,
  updateStatus,
  deleteStatus
}
