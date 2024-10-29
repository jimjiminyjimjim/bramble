'use client'

import {
  AudioLinesIcon,
  BotIcon,
  BrainCircuitIcon,
  CheckIcon,
  UserRoundCogIcon,
} from "lucide-react";
import { Card } from "react-daisyui";
import { anchorTags } from "@/helpers/anchorTags";

export const Feature = ({anchor}) => {

  return (
    <section className="py-8 lg:py-24" {...anchorTags(anchor)}>
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-5 xl:gap-24">
          <div className="lg:col-span-2">
            <p className="text-xl font-semibold lg:text-3xl">
              Why choose the WrapAi App?
            </p>
            <p className="mt-4 text-base">
              Your AI companion, offers natural language understanding,
              personalized experiences, and predictive analytics, seamlessly
              integrating voice commands, image recognition, and context-aware
              interactions for a smarter, more efficient digital life.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <CheckIcon className="size-5 text-primary" size={20} />
                <p className="text-base font-medium">
                  Efficient Task Automation & Syncing
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="size-5 text-primary" size={20} />
                <p className="text-base font-medium">
                  Security and vulnerability Detection
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="size-5 text-primary" size={20} />
                <p className="text-base font-medium">
                  Real-time Assistance & Learning
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            <Card className="border border-base-content/10">
              <div className="p-6">
                <BrainCircuitIcon className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">
                  Language Understanding
                </p>
                <p className="mt-2 text-base-content/90">
                  SmartAssist harnesses the power of advanced Natural Language
                  Processing (NLP) to understand and interpret human language
                  seamlessly.
                </p>
              </div>
            </Card>
            <Card className="border border-base-content/10">
              <div className="p-6">
                <BotIcon className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">
                  Intelligent Virtual Assistant
                </p>
                <p className="mt-2 text-base-content/80">
                  Meet IntelliConnect, your AI-driven personal assistant. It
                  organizes your schedule, answers questions, and adapts to your
                  preferences.
                </p>
              </div>
            </Card>
            <Card className="border border-base-content/10">
              <div className="p-6">
                <UserRoundCogIcon className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">
                  Personalized User Experience
                </p>
                <p className="mt-2 text-base-content/80">
                  Discover IntelliConnect: personalized tech that learns from
                  you, tailoring content and streamlining tasks for a unique
                  user experience.
                </p>
              </div>
            </Card>
            <Card className="border border-base-content/10">
              <div className="p-6">
                <AudioLinesIcon className="text-primary" size={32} />
                <p className="mt-2 text-xl font-semibold">
                  Voice Command Capabilities
                </p>
                <p className="mt-2 text-base-content/80">
                  Effortlessly command your digital world with IntelliConnect's
                  speech recognition. Speak for messaging, calls, and tasks –
                  your voice is the key.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
