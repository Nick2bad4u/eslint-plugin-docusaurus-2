export interface PresetsRuleModule {
    readonly meta?:
        | {
              readonly docs?:
                  | {
                        readonly presets?:
                            | readonly string[]
                            | string
                            | undefined;
                        readonly url?: string | undefined;
                    }
                  | undefined;
          }
        | undefined;
}

export function generatePresetsRulesMatrixSectionFromRules(
    rules: Readonly<Record<string, PresetsRuleModule>>
): string;

export function syncPresetsRulesMatrix(input?: {
    readonly writeChanges?: boolean;
}): Promise<Readonly<{ changed: boolean }>>;
