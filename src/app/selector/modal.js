// @flow

import type {AppState, ModalConfig} from '../type-next'

export const isModalOpen = (state: AppState): boolean => state.modal.isOpen
export const selectModalConfig = (state: AppState): ModalConfig => state.modal.modalConfig
