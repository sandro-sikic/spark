
# IMAGE SETTINGS
default_height = 512
default_width = 512
default_cfg_scale = 7
default_clip_guidance_preset = "FAST_BLUE"
default_samples = 1
default_steps = 10




def image_properties(text: str, height: int = default_height, width: int = default_width, cfg_scale: int = default_cfg_scale, clip_guidance_preset: str = default_clip_guidance_preset, samples: int = default_samples, steps: int = default_steps):
    json_data = {
        "text_prompts": [
            {
                "text": text
            }
        ],
        "cfg_scale": cfg_scale,
        "clip_guidance_preset": clip_guidance_preset,
        "height": height,
        "width": width,
        "samples": samples,
        "steps": steps,
    }
    return json_data



additional_strings  = " mountainous forested wilderness open fields, beautiful views, painterly concept art, joanna gaines, environmental concept art, concept art illustration by ross tran, by james gurney, by craig mullins, by greg rutkowski trending on artstation "

def enhanced_image_properties(text: str, height: int = default_height, width: int = default_width, cfg_scale: int = default_cfg_scale, clip_guidance_preset: str = default_clip_guidance_preset, samples: int = default_samples, steps: int = default_steps):
    enhanced_image = text + additional_strings
    json_data = {
        "text_prompts": [
            {
                "text": enhanced_image
            }
        ],
        "cfg_scale": cfg_scale,
        "clip_guidance_preset": clip_guidance_preset,
        "height": height,
        "width": width,
        "samples": samples,
        "steps": steps,
    }
    return json_data