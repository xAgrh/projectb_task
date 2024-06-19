branch:=$(shell git branch --show-current)
imageName=projectb/interview
imageId=$(imageName):$(branch)

configPath = ./docker

dcLocal = IMAGE=$(imageId) docker compose -f  $(configPath)/dc.local.yml

help : ## Show this help.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$'#' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf "%-30s %s\n" $$help_command $$help_info ; \
	done

build : ## Build docker images
	$(dcLocal) build

db: ## Start a db for local dev
	$(dcLocal) up projectb_mongodb

redis: ## Start a redis for local dev
	$(dcLocal) up redis-server
