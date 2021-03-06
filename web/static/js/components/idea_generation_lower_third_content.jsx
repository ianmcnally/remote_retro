import React from "react"

import IdeaSubmissionForm from "./idea_submission_form"
import StageProgressionButton from "./stage_progression_button"
import stageConfigs from "../configs/stage_configs"

import * as AppPropTypes from "../prop_types"
import STAGES from "../configs/stages"

const { IDEA_GENERATION, ACTION_ITEMS, CLOSED } = STAGES

const IdeaGenerationLowerThirdContent = props => {
  const { stage, ideas } = props

  const stageConfig = stageConfigs[stage]
  const showActionItem = [ACTION_ITEMS, CLOSED].includes(stage)

  function progressionDisabled() {
    const noIdeasCreated = stage === IDEA_GENERATION && !ideas.length
    const noActionItemsCreated = stage === ACTION_ITEMS && !ideas.some(idea => idea.category === "action-item")
    return noIdeasCreated || noActionItemsCreated
  }

  return (
    <div className="ui stackable grid basic attached secondary center aligned segment">
      <div className="thirteen wide column">
        <IdeaSubmissionForm {...props} showActionItem={showActionItem} />
      </div>
      <div className="three wide right aligned column">
        <StageProgressionButton
          {...props}
          config={stageConfig}
          buttonDisabled={progressionDisabled()}
        />
      </div>
    </div>
  )
}

IdeaGenerationLowerThirdContent.propTypes = {
  ideas: AppPropTypes.ideas.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  stage: AppPropTypes.stage.isRequired,
}

export default IdeaGenerationLowerThirdContent
