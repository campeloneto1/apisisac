<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patrimonio extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'patrimonios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';
    
    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['patrimonio_tipo', 'subunidade', 'setor'];

     public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function setor()
    {
        return $this->belongsTo(Setor::class)->without(['subunidade']);
    }

    public function patrimonio_tipo()
    {
        return $this->belongsTo(PatrimonioTipo::class);
    }

}
