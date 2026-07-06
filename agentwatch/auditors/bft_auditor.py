import asyncio


class BFTAuditor:
    def __init__(
        self,
        configs: list[dict],
        quorum_size: int = 2,
        provider_weights: dict[str, float] | None = None,
    ):
        self.configs = configs
        self.quorum_size = quorum_size
        self.provider_weights = provider_weights or {}

    async def _audit_provider(self, config: dict, step_number: int, step_data: dict) -> dict:
        # Mock provider audit
        await asyncio.sleep(0.5)
        provider = config.get("provider", "unknown")

        # Apply static weight override if provided, otherwise default dynamic logic
        weight = self.provider_weights.get(provider, 1.0)

        return {"score": 1.0 * weight, "provider": provider, "weight_applied": weight}

    async def audit_step(self, step_number: int, step_data: dict) -> dict:
        tasks = [self._audit_provider(c, step_number, step_data) for c in self.configs]

        results = await asyncio.gather(*tasks, return_exceptions=True)

        valid_results = [r for r in results if not isinstance(r, Exception)]
        if len(valid_results) < self.quorum_size:
            return {"error": "Quorum not reached", "consensus_score": 0.0}

        # Weighted consensus logic
        total_weight = sum(r.get("weight_applied", 1.0) for r in valid_results)
        consensus_score = sum(r.get("score", 0.0) for r in valid_results) / (total_weight or 1)

        return {"consensus_score": consensus_score, "individual_scores": valid_results}
