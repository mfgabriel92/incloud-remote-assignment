<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TaskRepository")
 */
class Task
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $concludedAt;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    private $duration;

    public function getId()
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getConcludedAt()
    {
        return $this->concludedAt;
    }

    public function setConcludedAt($concludedAt): self
    {
        $this->concludedAt = $concludedAt;

        return $this;
    }

    public function getDuration()
    {
        return $this->duration;
    }

    public function setDuration($duration): self
    {
        $this->duration = $duration;

        return $this;
    }
}
