## Kill Port
PORT ?= 80

.PHONY: killport
killport:
	@read -p "Enter port number to kill (default $(PORT)): " input_port; \
	port=$${input_port:-$(PORT)}; \
	pids=$$(lsof -ti :$$port); \
	if [ -n "$$pids" ]; then \
		echo "Killing processes on port $$port"; \
		kill -9 $$pids; \
	else \
		echo "No processes found on port $$port"; \
	fi