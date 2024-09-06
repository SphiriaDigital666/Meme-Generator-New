import {
  changeTab,
  changeRatioByIndex,
  changeTemplateByIndex,
  setCanvas,
} from "@/redux/canvasSlice"
import { useAppDispatch } from "@/redux/hooks"
import {
  clearAllImages,
  clearSelectedImage,
  newImage,
  setSelectedImage,
  setImageFilterValue,
} from "@/redux/selectedImageSlice"
import type { ImageFilterUpdate, SelectedTabType, UploadedImage } from "@/types"
import type { Canvas } from "fabric"
import { setSavedImage, clearSavedImage } from "@/redux/canvasSlice"


function useTabAction() {
  const dispatch = useAppDispatch()
  const changeTabAction = (tab: SelectedTabType) => {
    dispatch(changeTab(tab))
  }
  return { changeTabAction }
}

function useRatioAction() {
  const dispatch = useAppDispatch()
  const changeRatio = (index: number) => {
    dispatch(changeRatioByIndex(index))
    dispatch(clearAllImages())
  }
  return { changeRatio }
}

function useTemplateAction() {
  const dispatch = useAppDispatch()
  const changeTemplate = (index: number) => {
    dispatch(changeTemplateByIndex(index))
    dispatch(clearAllImages())
  }
  return { changeTemplate }
}

function useImageFilterAction() {
  const dispatch = useAppDispatch()
  const changeFilterValue = (values: ImageFilterUpdate) => {
    dispatch(setImageFilterValue(values))
  }
  return { changeFilterValue }
}

function useCanvasAction() {
  const dispatch = useAppDispatch()
  const addImageAction = (imagePayload: UploadedImage) => {
    dispatch(newImage(imagePayload))
  }
  const clearSelectedImageAction = () => {
    dispatch(clearSelectedImage())
  }
  const setCanvasAction = (canvas: Canvas) => {
    dispatch(setCanvas(canvas))
  }
  const setSelectedImageAction = (id: string) => {
    dispatch(setSelectedImage(id))
  }

  const setSavedImageAction = (imageData: string | null) => {
    dispatch(setSavedImage(imageData));
  };

  const clearSavedImageAction = () => {
    dispatch(clearSavedImage());
  };
  return {
    addImageAction,
    clearSelectedImageAction,
    setCanvasAction,
    setSelectedImageAction,
    setSavedImageAction,
    clearSavedImageAction,
  }
}

export {
  useTabAction,
  useRatioAction,
  useTemplateAction,
  useImageFilterAction,
  useCanvasAction,
}
